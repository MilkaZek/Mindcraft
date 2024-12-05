export default function Timer_Input({ time, setTime }) {
    function timeset(event) {
      time(event.target.value);
      setTime(event.target.value * 60);
    }
    return (
      <div>
        <select onChange={timeset}>
          
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
          <option value={30}>30</option>
          <option value={35}>35</option>
          <option value={40}>40</option>
          <option value={45}>45</option>
        </select>
      </div>
    );
  }
  