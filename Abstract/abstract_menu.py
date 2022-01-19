import abc


class AbstractMenu(metaclass=abc.ABCMeta):

    @abc.abstractmethod
    def start(self):
        raise NotImplementedError

    @abc.abstractmethod
    def print_menu(self):
        raise NotImplementedError

    @abc.abstractmethod
    def manage_options(self):
        raise NotImplementedError

    @abc.abstractmethod
    def exit_menu(self):
        raise NotImplementedError
