export default function Background() {
    function change(event) {
      const value = event.target.value;
      if (value.startsWith("http")) {
        document.body.style.backgroundImage = `url(${value})`;
      } else {
        document.body.style.backgroundColor = value;
        document.body.style.backgroundImage = "";
      }
    }
  
    return (
      <select onChange={change}>
        <option value="#f5f5f5">Light Gray</option>
        <option value="#f0e4d7">Warm Beige</option>
        <option value="#b8d8d8">Pale Teal</option>
        <option value="#ff6f61">Soft Coral</option>
        <option value="#a2c2e4">Powder Blue</option>
        <option value="#e1c7d0">Dusty Rose</option>
        <option value="#c6e2ff">Light Sky Blue</option>
        <option value="https://amaliahomecollection.com/wp-content/uploads/2018/12/blue-ocean-692x391.png">
          Beach
        </option>
        <option value="https://cdn.prod.website-files.com/5e261bc81db8f19fa664899d/64add0eb758ddc8d390ed4a0_out-0.png">
          Mountain
        </option>
      </select>
    );
  }
  