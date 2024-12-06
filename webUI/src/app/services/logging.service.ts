import { Injectable } from '@angular/core';
import { LogPublisher } from '../model/logging/LogPublisher';
import { ConsoleLogPublisher } from '../model/logging/ConsoleLogPublisher';
import { LocalStoragePublisher } from '../model/logging/LocalStoragePublisher';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  constructor() {}
  level: LogLevel = LogLevel.INFO;
  publishers: LogPublisher[] = [new ConsoleLogPublisher()]

  info(msg: string) {
    this.writeToLog(msg, LogLevel.INFO);
  }

  warn(msg: string) {
    this.writeToLog(msg, LogLevel.WARNING);
  }

  error(msg: string) {
    this.writeToLog(msg, LogLevel.ERROR);
  }

  writeToLog(message: string, logLevel: LogLevel) {
   if (logLevel >= this.level) {
    // Build the message
    let fullMessage = new Date() + " - ";
    fullMessage += "Type: " + LogLevel[logLevel];
    fullMessage += " - Message: " + message;

    // Publish message to various places
    this.publishers.forEach(p => p.log(fullMessage, logLevel).subscribe());
   }
  }
}

export enum LogLevel {
  INFO = 0,
  WARNING = 1,
  ERROR = 2
}
