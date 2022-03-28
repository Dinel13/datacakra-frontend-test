function Footer(): JSX.Element {
  return (
    <footer className="py-2.5 px-3 md:px-5 lg:px-8">
      <p className="py-4 border-t-2 border-sky-300">
        &copy; 2022{" "}
        For <a className="text-blue-700" href="https://datacakra.com/" target="_blank" rel="noreferrer">
          Datacakra
        </a> Front-end test by
        <a className="ml-1 text-blue-700" href="https://dinel.netlify.app/" target="_blank" rel="noreferrer">
          salahuddin
        </a>.
      </p>
    </footer>
  );
}

export default Footer;
