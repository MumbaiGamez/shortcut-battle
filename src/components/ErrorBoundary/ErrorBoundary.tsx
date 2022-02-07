import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { ErrorBoundaryProps, ErrorBoundaryState } from './types';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state?.hasError) {
      return <h1>{this.props.t('errors.somethingWrong')}</h1>;
    }

    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
