import type { Meta, StoryObj } from '@storybook/react';
import { Gallery } from './Gallery';
import { ApiImage } from '../../types/media';

import sampleImages from "../../../test/data/sampleImages.json"

const meta: Meta<typeof Gallery> = {
  title: 'Media/Gallery',
  component: Gallery,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A images gallery component that displays a collection of images and videos with navigation controls.',
      },
    },
  },
  argTypes: {
    images: {
      description: 'Array of images items to display in the gallery',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;


const images: ApiImage[] = sampleImages;

export const Default: Story = {
  args: {
    images
  },
};

export const EmptyGallery: Story = {
  args: {
    image: [],
  },
};