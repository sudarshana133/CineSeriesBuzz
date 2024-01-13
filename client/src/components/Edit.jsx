import { SquarePen, Check } from "lucide-react";
import { useState } from "react";
const Edit = ({
  isEditing,
  initialTitle,
  setIsEditing,
  setInitialTitle,
  setSendTitleToBackend
}) => {
  const [btn, setBtn] = useState(false);
  return (
    <div>
      {btn === false && (
        <button
          onClick={() => {
            setBtn(true);
            setIsEditing(true);
            setSendTitleToBackend(false)
          }}
        >
          <SquarePen size={20} strokeWidth={2} />
        </button>
      )}
      {btn === true && (
        <button
          onClick={() => {
            setBtn(false);
            setIsEditing(false);
            setSendTitleToBackend(true)
          }}
        >
          <Check size={20} color="#00ff33" strokeWidth={1} />
        </button>
      )}
    </div>
  );
};

export default Edit;
