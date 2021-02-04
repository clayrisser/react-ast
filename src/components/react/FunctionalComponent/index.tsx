import React, { FC } from 'react';
import Import from '~/components/modules/Import';

export interface FunctionalComponentProps {
  name: string;
  debug?: boolean;
}

const FunctionalComponent: FC<FunctionalComponentProps> = (
  props: FunctionalComponentProps
) => {
  const { name } = props;
  return (
    <>
      <Import default="React" imports={['FC']} from="react" />
    </>
  );
};

FunctionalComponent.defaultProps = {
  debug: false
};

export default FunctionalComponent;
