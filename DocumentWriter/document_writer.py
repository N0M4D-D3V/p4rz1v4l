from datetime import datetime
from Utils.utils import format_rate, format_float

class FileWriter:
    def __init__(self, results):
        self.results = results

    def save_results(self):
        formatted_results: str = self._format_results()
        with open("results.txt", "a") as file:
            file.write(str(formatted_results))

    def _format_results(self):
        formatted_result: str = str(datetime.now()) + " \n\n"
        for key in self.results.keys():
            if self.is_rate(key) and isinstance(self.results[key], float):
                self.results[key] = format_rate(self.results[key])
            if not self.is_rate(key) and isinstance(self.results[key], float):
                self.results[key] = format_float(self.results[key])
            formatted_result += key + ': ' + str(self.results[key]) + '\n'
        formatted_result += "\n<>-----< P4RZ1V4L >-----<>\n\n"
        return formatted_result

    def is_rate(self, key: str):
        return 'rate' in key
