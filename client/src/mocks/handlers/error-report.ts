import { rest } from 'msw';

import { ErrorReport } from '~/error-reporting/error-report.hook';
import { addErrorReport } from '~/mocks/fixtures/error-report';

// Descript the shape of the response body.
interface ErrorReportResponse {
  id: string;
  message: string;
  stackTrace: string;
}

const handleErrorReport = rest.post<string, ErrorReportResponse>('*/api/error/report', async (req, res, ctx) => {
  const body: ErrorReport = await req.json();
  const report = addErrorReport(body);

  return res(ctx.status(200), ctx.json(report));
});

const handlers = [handleErrorReport];

export default handlers;
