import CustomError from "./CustomError";

class UnAuthenticated extends CustomError {
  constructor(message: string) {
    super(message, 401);
  }
}
export default UnAuthenticated;
