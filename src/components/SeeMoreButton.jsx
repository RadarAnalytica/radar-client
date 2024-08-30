import interaction from "../assets/Interaction.png";
import { useNavigate } from "react-router-dom";
function SeeMoreButton({ path }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };
  return (
    <div className='image-button' onClick={handleClick}>
      <div className='circle'>
        <img src={interaction} alt='icon' className='icon-image' />
      </div>
      <span className='label'>Смотреть подробнее</span>
    </div>
  );
}

export default SeeMoreButton;
