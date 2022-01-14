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
    <div className={Styles.inputWrap}>
      <input
        {...props}
        ref={inputRef}
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
      >
        {placeholder}
      </label>
      <span
        data-testid={`${name}-status`}
        title={error || 'Tudo certo'}
        className={Styles.status}
      >
        {error ? '🔴' : '🟢'}
      </span>
    </div>
  );
};

export default Input;
