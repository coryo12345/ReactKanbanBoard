// The generic item type representing a draggable item
export type Item = any;

interface DropZoneI {
  id: number;
  container: HTMLElement;
  getItems: () => Item[];
  setItems: (items: Item[]) => void;
  orderableItemHeight?: number;
}

// group name -> drop zones
const dropZones = new Map<string, DropZoneI[]>();

/**
 * Registers a dropzone inside a group. Creates the group if it doesn't exist
 *
 * @param groupName Group name to register to
 * @param container Ref of container element, used to calculate positioning
 * @param items Array of objects in this dropzone. Will be updated if items moved to or from this zone
 * @returns unique id for this zone **in the group**
 */
export function registerZone(
  groupName: string,
  container: HTMLElement,
  getItems: () => Item[],
  setItems: (items: Item[]) => void,
  orderableItemHeight?: number
): number {
  // get group
  let group = dropZones.get(groupName);
  if (!group) {
    group = [];
    dropZones.set(groupName, group);
  }
  // add zone
  let id;
  if (group.length > 0) id = group[group.length - 1].id + 1; // next id
  else id = 0;
  group.push({
    id,
    container,
    getItems,
    setItems,
    orderableItemHeight,
  });
  return id;
}

/**
 * Removes a registered zone from the group
 * This will prevent items from being added to this zone
 */
export function removeZone(groupName: string, zoneId: number) {
  const group = dropZones.get(groupName);
  if (!group) return;
  dropZones.set(
    groupName,
    group.filter((zone) => zone.id !== zoneId)
  );
}

/**
 * Attempts to move an item from one dropzone to another of the same group
 * Will move item to the zone with the closes physical location on the screen
 *   (using center-based cartesian distances)
 * Will remove the item from the original set of items, and add to the new
 * @returns the zone id of the zone this item was moved to
 */
export function attemptItemMove(
  groupName: string,
  originalZoneId: number,
  movableElement: HTMLElement,
  item: Item
): number {
  const group = dropZones.get(groupName);
  if (!group) return -1;

  const srcZone = group.find((dz) => dz.id === originalZoneId);
  if (!srcZone) return -1;

  const targetId = getClosestZone(groupName, movableElement);
  if (targetId === -1) return -1;

  const targetZone = group.find((dz) => dz.id === targetId);
  if (!targetZone) return -1;

  // calculate index in target zone
  let targetIndex = targetZone.getItems().length;
  if (targetZone.orderableItemHeight) {
    const zoneTop = targetZone.container.getBoundingClientRect().top;
    const elementTop = movableElement.getBoundingClientRect().top;
    const diff = elementTop - zoneTop + targetZone.orderableItemHeight / 2;
    targetIndex = Math.max(
      0,
      Math.min(targetIndex, Math.floor(diff / targetZone.orderableItemHeight))
    );
  }

  // remove from old
  const srcItems = [...srcZone.getItems()];
  srcItems.splice(srcItems.indexOf(item), 1);
  srcZone.setItems(srcItems);

  // add to new
  const tmpNewItems = [...targetZone.getItems()];
  tmpNewItems.splice(targetIndex, 0, item);
  targetZone.setItems(tmpNewItems);

  return targetId;
}

function getClosestZone(groupName: string, element: HTMLElement): number {
  const group = dropZones.get(groupName);
  if (!group) return -1;

  // compute element center
  const elRect = element.getBoundingClientRect();
  const center = {
    x: Math.round((elRect.right - elRect.left) / 2 + elRect.left),
    y: Math.round((elRect.bottom - elRect.top) / 2 + elRect.top),
  };

  let closestZoneId = -1;
  let closestZoneDistance = Number.MAX_SAFE_INTEGER;
  // compute zone center & store distances
  group.forEach((zone) => {
    const zRect = zone.container.getBoundingClientRect();
    const zCenter = {
      x: Math.round((zRect.right - zRect.left) / 2 + zRect.left),
      y: Math.round((zRect.bottom - zRect.top) / 2 + zRect.top),
    };
    const zDist = Math.round(
      Math.sqrt(Math.pow(zCenter.x - center.x, 2) + Math.pow(zCenter.y - center.y, 2))
    );

    if (zDist < closestZoneDistance) {
      closestZoneId = zone.id;
      closestZoneDistance = zDist;
    }
  });

  return closestZoneId;
}
