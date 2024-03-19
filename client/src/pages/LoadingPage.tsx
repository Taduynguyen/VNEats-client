import { useState, useEffect } from 'react';
import { Progress } from "@/components/ui/progress";

const LoadingPage = () => {
  const [value, setValue] = useState(33);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prevValue => (prevValue < 100 ? prevValue + 1 : prevValue));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <Progress className="animate-pulse" value={value} />;
}

export default LoadingPage;