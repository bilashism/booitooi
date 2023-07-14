/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType, lazy, LazyExoticComponent } from 'react';

type LazyNamedFunction = <T extends ComponentType<any>>(
  name: string,
  importFunction: () => Promise<{ [key: string]: T }>
) => LazyExoticComponent<T>;

export const lazyNamed: LazyNamedFunction = (name, importFunction) =>
  lazy(() =>
    importFunction().then((module) => ({
      default: module[name],
    }))
  );
