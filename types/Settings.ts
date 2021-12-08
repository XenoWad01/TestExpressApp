interface CommonSettings {}

interface DatabaseConnectionData {
  host: string;
  port: number;
  name: string;
}

interface Settings {
  common: CommonSettings;
  base_path: string;
  database_connection_string: string;
  database_connection_data: DatabaseConnectionData;
}

export default Settings;
