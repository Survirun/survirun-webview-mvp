import { atom } from 'recoil';

export const userItem = atom({
    key: 'userItem',
    default: ["야구공"],
})

export const userThumbnail = atom({
    key: 'userThumbnail',
    default: '/static/images/default_thumbnail.png',
})