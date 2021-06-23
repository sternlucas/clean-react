import Spinner from '@/presentation/components/spinner/spinner';
import React from 'react';
import Styles from './form-status-styles.scss';

const FormStatus: React.FC = () => {
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      <Spinner className={Styles.spinner} />
      <span data-testid="main-error" className={Styles.error}>
        Erro
      </span>
    </div>
  );
};

export default FormStatus;
