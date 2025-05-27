import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Generate.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box, Modal, Typography } from '@mui/material';

function Generate() {
  const [matchId, setMatchId] = useState('');
  const [redTeams, setRedTeams] = useState([]);
  const [blueTeams, setBlueTeams] = useState([]);
  const [popupData, setPopupData] = useState(null);
  const [teamData, setTeamData] = useState({});
  const [capabilities, setCapabilities] = useState({ red: {}, blue: {} });
  const [strategySummary, setStrategySummary] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!localStorage.getItem('username')) {
      navigate('/Login');
    } else if (matchId === '') {
      alert('Enter match id');
    } else {
      try {
        const response = await fetch('http://localhost:5050/api/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ match_code: matchId })
        });

        const result = await response.json();
        if (result.success) {
          const data = result.data;
          setRedTeams(data.red.map(team => team.id));
          setBlueTeams(data.blue.map(team => team.id));

          const combinedData = {};
          const redSummaries = [];
          const blueSummaries = [];

          data.red.forEach(team => {
            combinedData[team.id] = {
              title: `Team ${team.id} Summary`,
              description: (team.summary || 'No summary provided.').replace(/\n/g, '<br />'),
            };
            redSummaries.push(team.summary);
          });

          data.blue.forEach(team => {
            combinedData[team.id] = {
              title: `Team ${team.id} Summary`,
              description: (team.summary || 'No summary provided.').replace(/\n/g, '<br />'),
            };
            blueSummaries.push(team.summary);
          });

          setTeamData(combinedData);
          setCapabilities(data.capabilities);

          const stratRes = await fetch('http://localhost:5050/api/strategy-summary', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ red: redSummaries, blue: blueSummaries })
          });

          const stratJson = await stratRes.json();
          if (stratJson.success) {
            const numberedSummary = stratJson.summary
  .replace(/Team 1/g, redTeams[0] || '')
  .replace(/Team 2/g, redTeams[1] || '')
  .replace(/Team 3/g, redTeams[2] || '')
  .replace(/Team 4/g, blueTeams[0] || '')
  .replace(/Team 5/g, blueTeams[1] || '')
  .replace(/Team 6/g, blueTeams[2] || '');

const formattedSummary = numberedSummary
  .split(/[\n\r\u2022\-]/)
  .map(s => s.trim())
  .filter(s => s.length > 0)
  .map(s => `• ${s}`)
  .join("\n\n");

setStrategySummary(formattedSummary);
          } else {
            setStrategySummary('Unable to generate strategy summary.');
          }
        } else {
          alert('Backend error: ' + result.error);
        }
      } catch (err) {
        alert('Request failed: ' + err.message);
      }
    }
  };

  const handleTeamClick = (teamId) => {
    const data = teamData[teamId];
    if (data) {
      setPopupData(data);
      setOpen(true);
    } else {
      alert(`No data available for team ${teamId}`);
    }
  };

  const handleClose = () => setOpen(false);

  const CapabilityGridBox = ({ title, teams, values, className }) => {
    const levels = ['Level 4', 'Level 3', 'Level 2', 'Level 1'];
    const parsed = teams.map((teamId, idx) => ({
      teamId,
      set: new Set((values[idx] || '').split(', '))
    }));

    return (
      <Box className={className} sx={{ mt: 2, p: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>{title}</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {parsed.map(p => (
            <div key={p.teamId} style={{ flex: 1, textAlign: 'center' }}>
              <Typography fontWeight="bold" sx={{ mb: 1 }}>Team {p.teamId}</Typography>
              {levels.map(level => (
                <Typography key={level}>{p.set.has(level) ? level : '—'}</Typography>
              ))}
            </div>
          ))}
        </div>
      </Box>
    );
  };

  const ClimbGridBox = ({ title, teams, values, className }) => {
    const levels = ['Park', 'Shallow', 'Deep'];
    const parsed = teams.map((teamId, idx) => ({
      teamId,
      set: new Set((values[idx] || '').split(', '))
    }));

    return (
      <Box className={className} sx={{ mt: 2, p: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>{title}</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {parsed.map(p => (
            <div key={p.teamId} style={{ flex: 1, textAlign: 'center' }}>
              <Typography fontWeight="bold" sx={{ mb: 1 }}>Team {p.teamId}</Typography>
              {levels.map(level => (
                <Typography key={level}>{p.set.has(level) ? level : '—'}</Typography>
              ))}
            </div>
          ))}
        </div>
      </Box>
    );
  };

  const AlgaeBox = ({ title, teams, values, className }) => {
    const parsed = values.map(val => {
      const hasProcessor = val.includes('processor');
      const hasBarge = val.includes('barge');
      if (hasProcessor && hasBarge) return 'processor and barge';
      if (hasProcessor) return 'processor';
      if (hasBarge) return 'barge';
      return 'none'; // blank if neither
    });
  
    return (
      <Box className={className} sx={{ mt: 2, p: 2 }}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>{title}</Typography>
        {teams.map((teamId, idx) => (
          <Typography key={teamId}>
            <strong>Team {teamId}:</strong> {parsed[idx]}
          </Typography>
        ))}
      </Box>
    );
  };
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Enter match id here"
        variant="outlined"
        value={matchId}
        onChange={(e) => setMatchId(e.target.value)}
        sx={{ mr: 2 }}
      />
      <Button variant="outlined" onClick={handleClick}>
        <strong>Get Match Info</strong>
      </Button>

      {strategySummary && (
        <Box sx={{ mt: 4, p: 3, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
          <Typography variant="h6" fontWeight="bold">Strategic Summary</Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mt: 1 }}>{strategySummary}</Typography>
        </Box>
      )}

      <div className="allgroupings" style={{ marginTop: '30px' }}>
        <div className="groupings" style={{ display: 'flex', gap: '4rem' }}>
          <div>
            <Box className="leftboxes">
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>Blue Alliance Teams</Typography>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {blueTeams.map((teamId) => (
                  <Box
                    key={teamId}
                    onClick={() => handleTeamClick(teamId)}
                    sx={{
                      cursor: 'pointer',
                      backgroundColor: '#d0e9ff',
                      padding: '10px 20px',
                      borderRadius: '12px',
                      boxShadow: 2,
                      '&:hover': { backgroundColor: '#b0dfff' },
                    }}
                  >
                    {teamId}
                  </Box>
                ))}
              </div>
            </Box>
            <CapabilityGridBox title="Coral Capabilities" teams={blueTeams} values={(capabilities.blue.coral || '').split(';')} className="leftboxes" />
            <AlgaeBox title="Algae Mechanisms" teams={blueTeams} values={(capabilities.blue.algae || '').split(';')} className="leftboxes" />
            <ClimbGridBox title="Climb Capabilities" teams={blueTeams} values={(capabilities.blue.climb || '').split(';')} className="leftboxes" />
          </div>

          <div>
            <Box className="rightboxes">
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>Red Alliance Teams</Typography>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {redTeams.map((teamId) => (
                  <Box
                    key={teamId}
                    onClick={() => handleTeamClick(teamId)}
                    sx={{
                      cursor: 'pointer',
                      backgroundColor: '#ffc8c8',
                      padding: '10px 20px',
                      borderRadius: '12px',
                      boxShadow: 2,
                      '&:hover': { backgroundColor: '#f8a8a8' },
                    }}
                  >
                    {teamId}
                  </Box>
                ))}
              </div>
            </Box>
            <CapabilityGridBox title="Coral Capabilities" teams={redTeams} values={(capabilities.red.coral || '').split(';')} className="rightboxes" />
            <AlgaeBox title="Algae Capabilities" teams={redTeams} values={(capabilities.red.algae || '').split(';')} className="rightboxes" />
            <ClimbGridBox title="Climb Capabilities" teams={redTeams} values={(capabilities.red.climb || '').split(';')} className="rightboxes" />
          </div>
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 400,
          }}
        >
          {popupData && (
            <>
              <Typography variant="h6" component="h2">
                {popupData.title}
              </Typography>
              <Typography sx={{ mt: 2 }} dangerouslySetInnerHTML={{ __html: popupData.description }} />
              <Button onClick={handleClose} sx={{ mt: 3 }} variant="contained">
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}

export default Generate;
