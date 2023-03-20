export abstract class AbstractStrategy {
  /**
   * Prepare the strategy. Sets the params in pre-executing sentences.
   *
   * @param dataframe
   */
  public abstract set_up(dataframe: any): void;

  /**
   * Checks if long signal is OK.
   *
   * @param i
   */
  public abstract check_long_signal(i: number): boolean;

  /**
   * Checks if short signal is OK.
   *
   * @param i
   */
  public abstract check_short_signal(i: number): boolean;
}
