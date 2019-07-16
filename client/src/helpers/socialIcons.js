import React from 'react';
/* eslint-disable import/prefer-default-export */
import Insta from '@/components/icons/social/Instagram';
import VK from '@/components/icons/social/VK';
import FB from '@/components/icons/social/FB';
import TW from '@/components/icons/social/TW';

export const getSocialIcons = size => ({
  vk: <VK width={size} />,
  twitter: <TW width={size} />,
  fb: <FB width={size} />,
  instagram: <Insta width={size} />,
});
