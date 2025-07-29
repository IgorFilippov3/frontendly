export function findObjectWithMinOrder<T extends { order: number }>(
  array: T[],
): T {
  return array.reduce((min, current) =>
    current.order < min.order ? current : min,
  );
}
