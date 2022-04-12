import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Carousel} from './carousel.component';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Atoms/Carousel',
  component: Carousel,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  //   argTypes: {
  //     backgroundColor: {control: 'color'},
  //   },
} as ComponentMeta<typeof Carousel>;

export const _Carousel: ComponentStory<typeof Carousel> = () => (
  <>
    
    {/* {[
      'https://media.istockphoto.com/photos/to-do-list-in-notebook-with-calendar-picture-id1092571024?k=20&m=1092571024&s=612x612&w=0&h=dz6l5jjYZC0lU2dUkqu5g5_0XtY3xnHs57mJDNlvJSk=',
      'https://media.istockphoto.com/photos/conceptual-and-inspirational-picture-id960544896?k=20&m=960544896&s=612x612&w=0&h=JsO0QbSKigoffDg1TN2NgzX04fV1ONisiBwpL9KbBQM=',
    ].map((item, key) => (
      <Carousel interval={5000} key={key}>
        <img
          key={key}
          src={item}
          className="img-thumbnail img-fluid"
          alt={key.toString()}
          style={{
            width: width <= 768 ? 400 : 700,
            height: width <= 768 ? 300 : 600,
          }}
        />
      </Carousel>
    ))} */}
  </>
);
