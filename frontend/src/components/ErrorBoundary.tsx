import React, { ReactNode } from "react";
import { logError } from "../lib/errorLib";
import "./ErrorBoundary.css";

interface IProps {
  children: ReactNode;
}

interface IState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<IProps, IState> {
  state: IState = { hasError: false };

  public static getDerivedStateFromError(_: Error): IState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    logError(error, errorInfo);
  }

  render() {
    return this.state.hasError ? (
      <div className="ErrorBoundary text-center">
        <h3>Sorry there was a problem loading this page</h3>
      </div>
    ) : (
      this.props.children
    );
  }
}
