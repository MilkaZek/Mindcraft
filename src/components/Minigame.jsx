export default function Minigame({
    data,
    action,
    message,
    setpopup,
    msg,
    streak,
    setstreak,
    setWork,
  }) {
    function closePopup(e) {
      setpopup(false);
      setWork(false);
    }
  
    function check(event) {
      event.preventDefault();
      const ans = event.target.elements[0].value;
      const number = Math.floor(Math.random() * 1025) + 1;
      action(number);
      let name = document.getElementById("name");
      name.value = "";
  
      if (ans.toLowerCase() === data.name) {
        message("Congrats! 🎉 You are correct.");
        setstreak(streak + 1);
      } else {
        message("Oops! WRONG answer.");
        setstreak(0);
      }
      if (streak >= 10) {
        message("You're on fire!!!❤️‍🔥");
      }
      if (streak >= 20) {
        message("Gotta catch 'em all!💪");
      }
    }
  
    if (!data || !data.sprites || !data.sprites.front_default || !data.name) {
      return <p>Loading...</p>;
    }
  
    return (
      <>
        <div className="popup">
          <div className="popup-content">
            <h2>Who's that Pokémon?</h2>
            <p>{msg}</p>
            <p>Streak: {streak}</p>
            <p>
              <img src={data.sprites.front_default} alt={data.name} />
            </p>
            <form onSubmit={check}>
              <input type="text" placeholder="Enter Pokémon name" id="name" />
            </form>
            <button className="close-button" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      </>
    );
  }
  