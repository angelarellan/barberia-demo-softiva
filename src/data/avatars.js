import { createAvatar } from '@dicebear/core'
import { personas } from '@dicebear/collection'
import { BARBERS } from './mockData'

export const BARBER_AVATARS = Object.fromEntries(
  BARBERS.map((barber) => [
    barber.id,
    createAvatar(personas, {
      seed: barber.id,
      backgroundColor: ['4f46e5', '7c3aed', '6366f1'],
    }).toDataUri(),
  ]),
)
