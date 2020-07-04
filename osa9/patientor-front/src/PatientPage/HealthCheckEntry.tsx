import React from "react";
import { HealthCheckRating } from "../types";
import HealthRatingBar from "../components/HealthRatingBar";

const HealthCheckEntry: React.FC<{ healthCheckRating: HealthCheckRating }> = ({ healthCheckRating }) => {
  return (
    <div>
      <HealthRatingBar showText rating={healthCheckRating} />
      <p>Health check rating: {healthCheckRating}</p>
    </div>
  );
};

export default HealthCheckEntry;