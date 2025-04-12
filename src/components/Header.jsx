import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import sanityClient from '../sanityClient';
import '../styles/header.scss';

const Header = () => {
  const [gruppenavn, setGruppenavn] = useState('');
  const [gruppenummer, setGruppenummer] = useState('');
  const [medlemmer, setMedlemmer] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "group"][0]{
        groupName,
        members[]->{
          name,
          "slug": slug.current
        }
      }`)
      .then((data) => {
        if (!data || !data.groupName) {
          console.warn('Fant ingen groupName i Sanity');
          return;
        }

        const parts = data.groupName.split(' – ');
        const navn = parts[0] || 'Team';
        const nummer = parts[1] || '';

        setGruppenavn(navn.trim());
        setGruppenummer(nummer.trim());
        setMedlemmer(data.members || []);
      })
      .catch((error) => {
        console.error('Sanity fetch error i Header:', error);
      });
  }, []);

  return (
    <header className="header">
      <div className="header__title">
        <strong>{gruppenavn}</strong>
        {gruppenummer && ` – ${gruppenummer}`}
      </div>

      <nav className="header__nav">
        <Link to="/">Hjem</Link>

        {medlemmer.length > 0 && <div className="nav-divider" />}

        {medlemmer.map((member) => {
          const key = member.slug || member._id || `${member.name}-${Math.random()}`;
          const fornavn = member.name?.split(' ')[0] || member.name;
          return (
            <Link key={key} to={`/profile/${member.slug}`}>
              {fornavn}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
