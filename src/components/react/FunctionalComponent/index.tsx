import React, { FC } from 'react';
import { Export, Import, Interface } from '~/components';

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
      <Export>
        <Interface name={`${name}Props`} />
      </Export>
    </>
  );
};

FunctionalComponent.defaultProps = {
  debug: false
};

export default FunctionalComponent;
