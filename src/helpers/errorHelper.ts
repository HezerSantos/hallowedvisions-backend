interface ErrorDetails {
    (message: string,
    status: number,
    json: Record<string, any>): void
}

interface HttpErrorDetails {
    message: string,
    status: number,
    json: Record<string, any>
}

class HttpError extends Error implements HttpErrorDetails{
  status: number
  json: Record<string, any>

  constructor(message: string, status: number, json: Record<any, string>) {
    super(message)
    this.status = status
    this.json = json
    Object.setPrototypeOf(this, HttpError.prototype)
  }
}

const throwError: ErrorDetails = (message, status, json) => {
  throw new HttpError(message, status, json)
}

