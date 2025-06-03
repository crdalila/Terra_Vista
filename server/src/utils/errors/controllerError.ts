interface errorInterface {
  statusCode: number,
  message: String
};

function catchError(error: any) {
  if (error.statusCode) {
    const myError: errorInterface = {
      statusCode: error.statusCode,
      message: error.message
    };
    return myError;
  }

  const myError: errorInterface = {
    statusCode: 500,
    message: "Internal server error"
  };
  return myError;
}

export default catchError;