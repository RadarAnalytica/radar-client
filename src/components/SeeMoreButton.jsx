import CirclePurple from "../assets/CirclePurple.svg";
import { useNavigate } from "react-router-dom";

function SeeMoreButton({ path }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };
  return (
    <div className='image-button' onClick={handleClick}>
      <div className='circle'>
        <img src={CirclePurple} alt='icon' className='icon-image' />
      </div>
      <span className='label'>Смотреть подробнее</span>
    </div>
  );
}

export default SeeMoreButton;
