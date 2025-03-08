import { useMemo } from "react";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";

function GenerateAvatar({ name }) {
  const avatar = useMemo(() => {
    return createAvatar(lorelei, {
      size: 128, // Keeps the resolution high
      seed: name,
    }).toDataUri();
  }, [name]);

  return (
    <img src={avatar} alt="Avatar" className="w-full max-w-[100px] h-auto" />
  );
}

export default GenerateAvatar;
