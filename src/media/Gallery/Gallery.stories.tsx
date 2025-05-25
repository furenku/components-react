import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { Gallery } from './Gallery';
import { ApiImage } from '../../types/media';

import sampleImages from "../../../test/data/sampleImages.json"

const meta: Meta<typeof Gallery> = {
  title: 'Media/Gallery',
  component: Gallery,
  parameters: {
    layout: 'fullscreen',
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
  render: (args) => (
    <div style={{ 
      width: '100%', 
      height: '100%',      
      position: 'absolute',
      top: 0,
      left: 0,
      padding: 0,
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        padding: 0,
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}>
       <Gallery images={images}/>
      </div>
    </div>
  ),
};

export const EmptyGallery: Story = {
  args: {
    images: [], // Fixed typo: was "image"
  },
  render: (args) => (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      minHeight: '20rem',
      position: 'relative', 
      padding: 0, 
      margin: 0 
    }}>
      <Gallery images={args.images}/>
    </div>
  ),
};