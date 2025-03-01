type HealthResponseStatus = 'ONLINE' | 'FAILED';

type HealthResponse = {
  status: HealthResponseStatus;
  time: Date;
  message?: string;
};

export { HealthResponse, HealthResponseStatus };
