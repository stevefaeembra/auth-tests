import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

const ENDPOINT = `${import.meta.env.VITE_API_URL}/api/error/report`;

export const ErrorReportData = z.object({
  id: z.optional(z.number()),
  message: z.string(),
  stackTrace: z.string(),
});

export type ErrorReport = z.infer<typeof ErrorReportData>;

export const useCreateErrorReport = () =>
  useMutation(async (report: ErrorReport) => {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(report),
    });

    if (!response.ok) {
      const error = await response.json();

      throw new Error(`Problem Creating Error Report: ${error.message}`);
    }

    const data: ErrorReport = await response.json();

    return ErrorReportData.parse(data);
  });
