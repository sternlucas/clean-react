import Context from '@/presentation/contexts/form/form-context';
import React, { useContext } from 'react';

import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(Context);

  const { name } = props;

  const error = errorState[name];

  const getStatus = (): string => {
    return '🔴';
  };

  const getTitle = (): string => {
    return error;
  };

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        readOnly
        onFocus={e => {
          e.target.readOnly = false;
        }}
      />
      <span
        data-testid={`${name}-status`}
        title={getTitle()}
        className={Styles.status}
      >
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;
