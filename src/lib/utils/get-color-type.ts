export const getTypeColor = (type: string) => {
  switch (type) {
    case 'normal':
      return '#a4acaf';
    case 'fire':
      return '#fd7d24';
    case 'water':
      return '#4592c4';
    case 'electric':
      return '#eed535';
    case 'grass':
      return '#9bcc50';
    case 'ice':
      return '#51c4e7';
    case 'fighting':
      return '#d56723';
    case 'poison':
      return '#b97fc9';
    case 'ground':
      return '#ab9842';
    case 'flying':
      return '#3dc7ef';
    case 'psychic':
      return '#f366b9';
    case 'bug':
      return '#729f3f';
    case 'rock':
      return '#a38c21';
    case 'ghost':
      return '#7b62a3';
    case 'dark':
      return '#707070';
    case 'steel':
      return '#9eb7b8';
    case 'dragon':
      return '#53a4cf';
    case 'fairy':
      return '#fdb9e9';
    default:
      return 'gray';
  }
};