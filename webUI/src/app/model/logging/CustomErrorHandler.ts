import { ErrorHandler, Injectable } from '@angular/core';
import { LoggingService } from '../../services/logging.service';

@Injectable()
export class CustomErrorHandlerService extends ErrorHandler {
  constructor(private logger: LoggingService) {
    super();
  }

  override handleError(error: any) {
    this.logger.error(error);
    super.handleError(error);
  }
}
