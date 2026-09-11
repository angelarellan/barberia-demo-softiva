import { createAvatar } from '@dicebear/core'
import { personas } from '@dicebear/collection'
import { BARBERS } from './mockData'

export const BARBER_AVATARS = Object.fromEntries(
  BARBERS.map((barber) => [
    barber.id,
    createAvatar(personas, {
      seed: barber.id,
      backgroundColor: ['f59e0b', 'd97706', 'fbbf24'],
    }).toDataUri(),
  ]),
)
