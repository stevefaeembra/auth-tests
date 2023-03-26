import { ErrorReport } from '~/error-reporting/error-report.hook';

const errorReports = [
  {
    id: 1,
    message: 'Example Message',
    stackTrace:
      'Error: ButtonWornOutException\n    at http://localhost:5173/src/components/buggy-counter.component.tsx:23:13\n    at commitHookEffectListMount (http://localhost:5173/node_modules/.vite/deps/chunk-GH7Z2EUS.js?v=3d96915e:16438:34)\n    at commitPassiveMountOnFiber (http://localhost:5173/node_modules/.vite/deps/chunk-GH7Z2EUS.js?v=3d96915e:17679:19)\n    at commitPassiveMountEffects_complete (http://localhost:5173/node_modules/.vite/deps/chunk-GH7Z2EUS.js?v=3d96915e:17652:17)\n    at commitPassiveMountEffects_begin (http://localhost:5173/node_modules/.vite/deps/chunk-GH7Z2EUS.js?v=3d96915e:17642:15)\n    at commitPassiveMountEffects (http://localhost:5173/node_modules/.vite/deps/chunk-GH7Z2EUS.js?v=3d96915e:17632:11)\n    at flushPassiveEffectsImpl (http://localhost:5173/node_modules/.vite/deps/chunk-GH7Z2EUS.js?v=3d96915e:18985:11)\n    at flushPassiveEffects (http://localhost:5173/node_modules/.vite/deps/chunk-GH7Z2EUS.js?v=3d96915e:18942:22)\n    at commitRootImpl (http://localhost:5173/node_modules/.vite/deps/chunk-GH7Z2EUS.js?v=3d96915e:18911:13)\n    at commitRoot (http://localhost:5173/node_modules/.vite/deps/chunk-GH7Z2EUS.js?v=3d96915e:18772:13)',
  },
];

export const addErrorReport = (report: ErrorReport) => {
  const id = errorReports.length + 1;
  const errorReport = { id, ...report };
  errorReports.push(errorReport);

  return errorReport;
};
