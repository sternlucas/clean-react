import Context from '@/presentation/contexts/form/form-context';
import React, { useContext, useRef } from 'react';

import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context);
  const inputRef = useRef<HTMLInputElement>();
  const { name } = props;
  const error = state[`${name}Error`];
  const { placeholder } = props;

  return (
    <div
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
      data-testid={`${name}-wrap`}
    >
      <input
        {...props}
        ref={inputRef}
        title={error}
        placeholder=" "
        data-testid={name}
        readOnly
        onFocus={e => {
          e.target.readOnly = false;
        }}
        onChange={e => {
          setState({
            ...state,
            [e.target.name]: e.target.value,
          });
        }}
      />
      <label
        role="presentation"
        htmlFor="placeholder"
        onClick={() => {
          inputRef.current.focus();
        }}
        title={error}
        data-testid={`${name}-label`}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default Input;
