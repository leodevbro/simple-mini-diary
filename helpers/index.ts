const genLongText = () => {
  const starter = 'sdfsd sdf sdgsdg sdf fdf sd fsddsfsdfsdfsd sfd';

  let newV = '';

  for (let i = 0; i < 30; i += 1) {
    newV += starter;
  }

  return newV;
};

export const longText = genLongText();
