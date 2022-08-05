from datetime import datetime
from Utils.utils import format_rate, format_float


def is_rate(key: str) -> bool:
    return 'rate' in key


class FileWriter:
    def __init__(self, results):
        self.results = results

    # Saves the input results inside a txt file.
    def save_results(self):
        formatted_results: str = self._format_results()
        with open("results.txt", "a") as file:
            file.write(str(formatted_results))

    # Formats the results for be written on a file.
    def _format_results(self):
        formatted_result: str = str(datetime.now()) + " \n\n"
        for key in self.results.keys():
            if is_rate(key) and isinstance(self.results[key], float):
                self.results[key] = format_rate(self.results[key])
            if not is_rate(key) and isinstance(self.results[key], float):
                self.results[key] = format_float(self.results[key])
            formatted_result += key + ': ' + str(self.results[key]) + '\n'
        formatted_result += "\n<>-----< P4RZ1V4L >-----<>\n\n"
        return formatted_result
