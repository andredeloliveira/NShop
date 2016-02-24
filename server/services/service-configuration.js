/*service configuration file for the the external OAuth services*/
ServiceConfiguration.configurations.remove(
  {service: 'facebook'}
);
ServiceConfiguration.configurations.insert({
  service: 'facebook',
  appId: '1093470037359256',
  secret: 'db6a6c83de32639669921131f404802c'
});
