export default function SocialMedia({ icon, onClick }) {
  return (
    <>
      <button onClick={onClick}>
        <img src={icon} alt={icon} className="h-9" />
      </button>
    </>
  );
}
