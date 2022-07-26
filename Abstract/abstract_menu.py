import abc


class AbstractMenu(metaclass=abc.ABCMeta):

    # Resets the menu values to default.
    @abc.abstractmethod
    def reset_default_values(self):
        raise NotImplementedError

    # Start with the menu process.
    @abc.abstractmethod
    def start(self):
        raise NotImplementedError

    # Prints the menu on prompt.
    @abc.abstractmethod
    def print_menu(self):
        raise NotImplementedError

    # Manages the options included in the menu.
    @abc.abstractmethod
    def manage_options(self, option: int):
        raise NotImplementedError

    # Closes the menu.
    @abc.abstractmethod
    def exit_menu(self):
        raise NotImplementedError
