import appHandlers from './app';
import authenticationHandlers from './authentication';
import errorReportHandlers from './error-report';

const handlers = [...appHandlers, ...errorReportHandlers, ...authenticationHandlers];

export default handlers;
