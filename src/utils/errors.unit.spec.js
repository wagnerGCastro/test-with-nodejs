import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';
import { logger } from './logger';
import { appError } from './errors';

jest.mock('./logger');
jest.mock('http-errors');

describe('Utils > errors', () => {
  beforeEach(() => {
    jest.clearAllMocks(0);
  });

  it('should execute logger error', () => {
    appError('Error message');

    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith('Error message');
  });

  it('should execute createError with message and default status code', () => {
    appError('Error message');

    expect(createError).toHaveBeenCalledTimes(1);
    expect(createError).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR, 'Error message');
  });

  it('should execute createError with message and provider status code', () => {
    appError('Error message', StatusCodes.UNPROCESSABLE_ENTITY);

    expect(createError).toHaveBeenCalledTimes(1);
    expect(createError).toHaveBeenCalledWith(StatusCodes.UNPROCESSABLE_ENTITY, 'Error message');
  });
});
