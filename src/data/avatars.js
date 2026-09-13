import { createAvatar } from '@dicebear/core'
import { personas } from '@dicebear/collection'

const cache = new Map()

export function getBarberAvatar(id) {
  if (!cache.has(id)) {
    cache.set(
      id,
      createAvatar(personas, {
        seed: id,
        backgroundColor: ['4f46e5', '7c3aed', '6366f1'],
      }).toDataUri(),
    )
  }
  return cache.get(id)
}
